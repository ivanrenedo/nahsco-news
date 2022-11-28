import React, { useEffect, useState } from "react";

import { ISelectProps, Option } from "../lib/interfaces";

const defaultStrings = {
  allItemsAreSelected: "Todos los elementos están seleccionados.",
  clearSearch: "Eliminar búsqueda",
  clearSelected: "Eliminar seleccionado",
  noOptions: "No hay opciones",
  search: "Búsqueda",
  selectAll: "Seleccionar todo",
  selectAllFiltered: "Seleccionar todo (Filtrado)",
  selectSomeItems: "Seleccionar...",
  create: "Crear",
};

const defaultProps: Partial<ISelectProps> = {
  value: [],
  hasSelectAll: true,
  className: "multi-select",
  debounceDuration: 200,
  options: [] as Option[],
};

interface MultiSelectContextProps extends ISelectProps {
  t: (key: string) => string;
  setOptions?;
}

interface MultiSelectProviderProps {
  props: ISelectProps;
  children;
}

const MultiSelectContext = React.createContext<MultiSelectContextProps>(
  {} as MultiSelectContextProps
);

export const MultiSelectProvider = ({
  props,
  children,
}: MultiSelectProviderProps) => {
  const [options, setOptions] = useState(props.options);
  const t = (key) => props.overrideStrings?.[key] || defaultStrings[key];

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  return (
    <MultiSelectContext.Provider
      value={{ t, ...defaultProps, ...props, options, setOptions }}
    >
      {children}
    </MultiSelectContext.Provider>
  );
};

export const useMultiSelect = () => React.useContext(MultiSelectContext);