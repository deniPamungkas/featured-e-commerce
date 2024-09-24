import { SkeletonCard } from "@/components/common/skeleton-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductFilter from "@/components/user/filter";
import ShoppingProductCard from "@/components/user/product-card";
import { sortOptions } from "@/config/constants";
import { fetchAllFilteredProducts } from "@/store/shop/product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const UserListing = () => {
  const { productList, isLoading } = useSelector((state) => state.shopProduct);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParams = searchParams.get("category");

  const createSearchParams = useCallback((filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }

    return queryParams.join("&");
  }, []);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = async (sectionId, currentOption) => {
    let copyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(sectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = { ...copyFilters, [sectionId]: [currentOption] };
    } else {
      const indexOfCurrentSection =
        copyFilters[sectionId].indexOf(currentOption);
      if (indexOfCurrentSection === -1) {
        copyFilters[sectionId].push(currentOption);
      } else {
        copyFilters[sectionId].splice(indexOfCurrentSection, 1);
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        await dispatch(
          fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProduct();
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParams(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, setSearchParams, createSearchParams]);

  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categoryParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{`${productList.length} Products`}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductCard
                    key={productItem.title}
                    // handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    // handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        )}
      </div>
      {/* <ProductDetailsDialog
    open={openDetailsDialog}
    setOpen={setOpenDetailsDialog}
    productDetails={productDetails}
  /> */}
    </div>
  );
};

export default UserListing;
