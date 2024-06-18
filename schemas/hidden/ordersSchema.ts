import { defineField, defineType } from 'sanity'
import { TbPackageExport } from "react-icons/tb";
const ordersSchema = defineType({
  name: 'allOrders',
  title: 'All Orders',
  type: 'document',
  
  icon: TbPackageExport,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'orders',
      title: 'New Orders',
      type: 'array',
      of: [
        defineField({
          name: "order",
          title: "Order",
          type: "object",
          fields: [
        defineField({
          name: 'buyerEmailOrTeleg',
          title: 'Email or Telegram',
          type: 'email',
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'selectedOrderAmount',
          title: 'Selected Order Amount',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'amountOfSelected',
          title: 'Amount of Selected',
          type: 'number',
          validation: (Rule) => Rule.required(),
        })
      ],
      
        }),
        
      ],
    }),
  ],
})

const readonlyOrdersSchema = {
  ...ordersSchema,
  readOnly: false,
}

export default readonlyOrdersSchema
