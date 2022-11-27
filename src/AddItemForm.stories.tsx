import React from "react"
import { action } from '@storybook/addon-actions'
import {AddItemForm} from "./AddItemForm";

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action("button add was pressed inside the form")

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}