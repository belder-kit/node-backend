import { ObjectDefinitionBlock, stringArg } from "nexus/dist/core";
import { nonNull } from "nexus";
import { GraphQLError } from "graphql";
import Stripe from "stripe";

function getPaymentIntentId(
  session: Stripe.Checkout.Session | undefined | null
) {
  if (typeof session?.payment_intent === "object") {
    return session.payment_intent?.id;
  }
  return session?.payment_intent;
}

export function completePayment(t: ObjectDefinitionBlock<"Mutation">) {
  t.field("completePayment", {
    type: "Boolean",
    args: {
      sessionId: nonNull(stringArg()),
    },
    async resolve(_, { sessionId }, { stripe, prisma }) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.status !== "complete") {
        throw new GraphQLError(
          `Stripe session status: ${session.status} is not complete`,
          {
            extensions: {
              code: "USER_INPUT_ERROR",
            },
          }
        );
      }

      await prisma.order.update({
        data: {
          status: "COMPLETE",
          paymentIntent: getPaymentIntentId(session),
        },
        where: {
          stripeSession: session.id,
        },
      });

      return true;
    },
  });
}
