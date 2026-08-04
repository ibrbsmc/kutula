import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function ItemSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="space-y-2">
      <label htmlFor="item-search" className="text-sm font-medium">
        Eşya Ara
      </label>

      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id="item-search"
          type="search"
          placeholder="Örneğin: Bardak"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
    </div>
  );
}

export default ItemSearch;
