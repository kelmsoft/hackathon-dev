import { Search } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by author, handle, or website..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-hackathon-accent/50 focus:border-hackathon-accent/50 
              transition-all placeholder:text-white/50 text-sm"
          />
        </div>
        
        {searchQuery && (
          <div className="text-sm text-white/60">
            Found {searchQuery ? 'results' : 'all projects'}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;