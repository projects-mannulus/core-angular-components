export interface checkEventTable<T> {
    type: 'on' | 'off';
    /**
     * la fila que se activada o desactivada.
     */
    row: T;
    allChecked: T[];
}