import { Input } from "@/components/ui/input";

function ItemSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="space-y-2">
      <label htmlFor="item-search" className="text-sm font-medium">
        Eşya Ara
      </label>

      <Input
        id="item-search"
        type="search"
        placeholder="Örneğin: Bardak"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default ItemSearch;
