import { Grid3X3, Table2 } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ListTableToggleProps {
  value: string;
  setValue: (value: string) => void;
}

const ListTableToggle: React.FC<ListTableToggleProps> = ({
  value,
  setValue,
}) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) setValue(value);
      }}
    >
      <ToggleGroupItem value="grid" aria-label="Toggle grid view">
        <Grid3X3 className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Toggle table view">
        <Table2 className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ListTableToggle;
