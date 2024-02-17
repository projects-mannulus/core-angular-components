export interface ModalCRUDPayload<T> {
  action: 'add' | 'edit' | 'delete' | 'view';
  row: T;
}
