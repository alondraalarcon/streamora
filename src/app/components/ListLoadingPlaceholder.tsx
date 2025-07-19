const ListLoadingPlaceholder = () => {
  return (
    <div className="flex flex-col rounded-3xl h-auto min-h-80 text-white cursor-pointer animate-pulse">
      <div className="w-full h-80 object-cover rounded-3xl bg-zinc-800" />
      <div className="flex flex-col py-2 w-full ">
        <span className="capitalize text-base font-black bg-zinc-800 h-8 rounded-lg"></span>
      </div>
    </div>
  );
};

export default ListLoadingPlaceholder;
