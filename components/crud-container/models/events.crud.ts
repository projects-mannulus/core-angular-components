export interface EventsCrudContainer {
    create: EventCreateCrudContainer,
    edit: EventEditCrudContainer,
    delete: EventDeleteCrudContainer,
}

export interface EventCrud {
    /**
     * endpoint donde se envia la informacion
     */
    url: string;
    type?: 'post' | 'put' | 'delete';
}
export interface EventEditCrudContainer extends EventCrud {
    type: 'put';
}
export interface EventDeleteCrudContainer extends EventCrud {
    type: 'delete';
}
export interface EventCreateCrudContainer extends EventCrud {
    type: 'post';
}
    