import { ReactNode } from "react";

export interface Option {
  key?: string;
  id: number,
  value;
  label: string;
  disabled?: boolean;
}

export interface SearchPeople {
  category?: string;
  src?: string;
  sector?: string;
  checked?: boolean
}

export interface FullOption extends Option, SearchPeople{}

export interface ISelectProps {
  options: FullOption[];
  value: FullOption[];
  onChange?;
  valueRenderer?: (selected: SearchPeople[], options: Option[]) => ReactNode;
  ItemRenderer?;
  ArrowRenderer?: ({ expanded }) => JSX.Element;
  isLoading?: boolean;
  disabled?: boolean;
  disableSearch?: boolean;
  shouldToggleOnHover?: boolean;
  hasSelectAll?: boolean;
  filterOptions?: (
    options: FullOption[],
    filter: string
  ) => Promise<FullOption[]> | FullOption[];
  overrideStrings?: { [key: string]: string };
  labelledBy: string;
  className?: string;
  id: string;
  title: string;
  onMenuToggle?;
  ClearIcon?: ReactNode;
  debounceDuration?: number;
  limitSelectedNumber?: number;
  ClearSelectedIcon?: ReactNode;
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  isCreatable?: boolean;
  onCreateOption?;
  closeOnChangedValue?: boolean;
}