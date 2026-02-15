import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { DEFAULT_PAGE } from "@/constants";

export const usePostFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(["draft", "published", "archived"])
      .withOptions({ clearOnDefault: true }),
  });
};
