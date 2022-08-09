import { snowflakeIdGenerator } from "@luchanso/snowflakeid";

export class SnowflakeId {
  snowflake = snowflakeIdGenerator();

  initialize() {}

  next() {
    return this.snowflake();
  }
}

export const snowflakeId = new SnowflakeId();
