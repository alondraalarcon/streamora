const ItemLoadingPlaceholder = () => {
  return (
    <div className="flex flex-row gap-5">
      <span className="w-[500px] h-[500px] object-cover rounded-3xl bg-zinc-800 animate-pulse" />
      <div className="flex flex-col w-full gap-5">
        <span className="h-10  bg-zinc-800 animate-pulse rounded"></span>
        <span className="h-10 bg-zinc-800 animate-pulse rounded"></span>
        <span className="h-10 bg-zinc-800 animate-pulse rounded"></span>
        <span className="h-10  bg-zinc-800 animate-pulse rounded"></span>
      </div>
    </div>
  );
};

export default ItemLoadingPlaceholder;
