import { Models } from "appwrite";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  console.log(isSearchFetching);
  if (isSearchFetching)
    return <p className="animate-pulse">Searching your posts</p>;

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return <div>No result found</div>;
};

export default SearchResults;
