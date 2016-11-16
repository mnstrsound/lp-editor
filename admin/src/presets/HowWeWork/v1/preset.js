export default {
    id: 'HowWeWork/variant1',
    name: 'Variant1',
    preset: {
        type: 'Section',
        attrs: {
            style: null
        },
        children: [
            {
                type: 'Container',
                children: [
                    {
                        type: 'Row',
                        children: [
                            {
                                type: 'Title',
                                text: 'Как мы работаем!'
                            }
                        ]
                    },
                    {
                        type: 'Row',
                        children: [
                            {
                                type: 'Column',
                                width: 3,
                                children: [
                                    {
                                        type: 'Block',
                                        children: [
                                            {
                                                type: 'Title',
                                                text: 'Шаг 1',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'Column',
                                width: 3,
                                children: [
                                    {
                                        type: 'Block',
                                        children: [
                                            {
                                                type: 'Title',
                                                text: 'Шаг 2',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'Column',
                                width: 3,
                                children: [
                                    {
                                        type: 'Block',
                                        children: [
                                            {
                                                type: 'Title',
                                                text: 'Шаг 3',
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'Column',
                                width: 3,
                                children: [
                                    {
                                        type: 'Block',
                                        children: [
                                            {
                                                type: 'Title',
                                                text: 'Шаг 4',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}