interface EmptyStateProps {
  isSearchOrFilter?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isSearchOrFilter }) => {
  return (
    <div>
      <div>Snippets not found</div>
      <div>
        {isSearchOrFilter
          ? "Try adjusting your search and filter"
          : "Create a new snippet to get started"}
      </div>
    </div>
  );
};
