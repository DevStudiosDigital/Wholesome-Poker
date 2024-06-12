import { GraphUrl } from "@/data/config";
import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getOwnedNFTsQuery } from "./apollo-query";

export const getOwnedTokenIds = async (owner: string) => {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };

  const client = new ApolloClient({
    link: new HttpLink({ uri: GraphUrl, fetch }),
    cache: new InMemoryCache(),
    defaultOptions,
  });
  const query = getOwnedNFTsQuery(owner);
  const res = await client.query({
    query,
    fetchPolicy: "no-cache",
    errorPolicy: "none",
  });
  const tokenIds: number[] = res.data.tokens.map((token: any) =>
    Number(token.tokenId)
  );
  return tokenIds;
};
