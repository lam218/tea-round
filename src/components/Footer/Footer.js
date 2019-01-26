import React from "react";
import FilterLink from "../../containers/FilterLink";
import { VisibilityFilters } from "../../actions";

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.ORDER_CREATED}>FIRST</FilterLink>
    <FilterLink filter={VisibilityFilters.LOWEST_FIRST}>LOWEST</FilterLink>
    <FilterLink filter={VisibilityFilters.HIGHEST_FIRST}>HIGHEST</FilterLink>
  </div>
);

export default Footer;
