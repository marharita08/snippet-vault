interface EmptyStateProps {
  isSearchOrFilter?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isSearchOrFilter }) => {
  return (
    <div className="w-full flex items-center justify-center gap-2 flex-col">
      <div className="font-semibold">Snippets not found</div>
      <div>
        {isSearchOrFilter
          ? "Try adjusting your search and filter"
          : "Create a new snippet to get started"}
      </div>
    </div>
  );
};
