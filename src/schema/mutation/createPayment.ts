import { inputObjectType, ObjectDefinitionBlock } from "nexus/dist/core";
import { nonNull, list } from "nexus";
import Stripe from "stripe";
import invariant from "invariant";

const stripeCallbackHost = process.env.STRIPE_CALLBACK_HOST;

invariant(
  stripeCallbackHost !== undefined,
  "env STRIPE_CALLBACK_HOST should be set"
);

export function createPayment(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("createPayment", {
    type: "String",
    args: {
      cart: nonNull(
        list(
          nonNull(
            inputObjectType({
              name: "products",
              definition(t) {
                t.nonNull.string("id");
                t.nullable.int("quantity");
              },
            })
          )
        )
      ),
    },
    async resolve(_, { cart }, { stripe, prisma }) {
      const { productsId, quantityMap } = cart.reduce<{
        productsId: string[];
        quantityMap: Record<string, number | undefined>;
      }>(
        (prev, next) => {
          prev.productsId.push(next.id);
          prev.quantityMap[next.id] = next.quantity || 1;

          return prev;
        },
        { productsId: [], quantityMap: {} }
      );

      const products = await prisma.product.findMany({
        where: {
          id: {
            in: productsId,
          },
        },
      });

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products?.map((item) => ({
          price_data: {
            currency: item?.currency || "usd",
            product_data: {
              name: item?.name,
              description: item?.description || undefined,
              images: item?.images || undefined,
            },
            unit_amount: item?.amount,
          },
          quantity: quantityMap[item.id] || 1,
        }));

      const session = await stripe.checkout.sessions.create({
        success_url: `${stripeCallbackHost}/success?id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${stripeCallbackHost}/cancel`,
        mode: "payment",
        line_items: lineItems,
      });

      await prisma.order.create({
        data: {
          stripeSession: session.id,
          amount: session.amount_total,
          currency: session.currency,
        },
      });

      return session.url;
    },
  });
}
