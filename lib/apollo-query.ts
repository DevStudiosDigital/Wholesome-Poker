import { gql } from "@apollo/client";

export const getOwnedNFTsQuery = (owner: string) => gql`
  query getTokensOfOwner {
    tokens(
      where: {
        owner: "${owner}"
        updatedAt_lte: ${new Date().getTime()}
      }
    ) {
      id
      tokenId
      owner
    }
  }
`;
