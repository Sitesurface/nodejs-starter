/**
 * Represents metadata for a collection of items, such as the current page number and item count.
 */
interface Meta {
  /** The current page number */
  page?: number;
  /** The total number of items in the collection */
  count?: number;
}

export default Meta;
