export default function CollectionSkeleton(): JSX.Element {
  return (
    <div className="relative pl-5 md:pl-0">
      <div className="mt-20 flex h-full animate-pulse">
        <div className="lg:grid lg:grid-cols-5 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-8">
          <div className="lg:col-span-2 lg:row-end-1">
            <div className="h-[200px] w-[350px] rounded-md bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
