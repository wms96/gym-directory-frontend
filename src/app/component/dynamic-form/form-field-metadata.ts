export interface FormFieldMetadata {
  type: 'string' | 'chip' | 'select' | 'file' | 'checkBox' | 'number'; // Add more types as needed
  options?: string[]; // For select fields
  layout?: 'singleRow' | 'default'; // New property for layout
  section?: string; // New property for section
}
