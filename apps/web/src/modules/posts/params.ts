import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";
import { DEFAULT_PAGE } from "@/constants";

export const searchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(["draft", "published", "archived"])
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(searchParams);
