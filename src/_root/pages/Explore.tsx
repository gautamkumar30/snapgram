import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import GridPostList from "./GridPostList";
import {
  useGetInfinitePosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetInfinitePosts();
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 500);

  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return <div className="animate-pulse">Loading</div>;
  }

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="flex flex-col gap-5 h-full">
      <h1 className="h3-bold">Search Posts</h1>
      <Input
        className="p-6 w-full bg-gray-600 border-none text-base"
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <h3 className="h3-bold">Popular Today</h3>
      <div>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p>End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && <div ref={ref}>Loading</div>}
    </div>
  );
};

export default Explore;
