export default {
    id: 'ContactForm/variant1',
    name: 'Variant1',
    preset: {
        type: 'Form',
        attrs: {
            style: null
        },
        children: [
            {
                type: 'Title',
                text: 'Форма обратной связи'
            },
            {
                type: 'Input',
                attrs: {
                    type: 'text',
                    name: 'phone',
                    placeholder: 'Телефон'
                }
            },
            {
                type: 'Input',
                attrs: {
                    type: 'text',
                    name: 'email',
                    placeholder: 'E-mail'
                }
            },
            {
                type: 'Input',
                attrs: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Имя'
                }
            },
            {
                type: 'Paragraph',
                text: 'Мы не передаем данные 3-им лицам'
            }
        ]
    }
}