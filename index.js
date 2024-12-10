/*
    task
    1. Напишите функцию подготовки строки, которая заполняет шаблон данными из указанного объекта
    2. Пришлите код целиком, чтобы можно его было проверить
    3. Придерживайтесь code style текущего задания
    4. По необходимости - можете дописать код, методы
    5. Разместите код в гите и пришлите ссылку
*/

/**
 * Класс для работы с API
 *
 * @author		User Name
 * @version		v.1.0 (dd/mm/yyyy)
 */
class Api
{
    constructor()
    {

    }


    /**
     * Заполняет строковый шаблон template данными из объекта object
     *
     * @author		User Name
     * @version		v.1.0 (dd/mm/yyyy)
     * @param		{object} object
     * @param		{string} template
     * @return		{string}
     */
    get_api_path(object, template)
    {
        return template.replaceAll(/%.+?%/g, (value) => object[value.slice(1, -1)]);
    }

    /**
     * Второй вариант решения той же задачи но без регулярок
     * @param object
     * @param template
     * @returns {string}
     */
    get_api_path2(object, template)
    {
        let result = '';
        let saved_percent_symbols_count = 0;
        let current_field_name = '';

        for (let i = 0; i < template.length; i++)
        {
            if (template[i] === '%')
            {
                saved_percent_symbols_count++;

                if (saved_percent_symbols_count === 2) {
                    result += object[current_field_name];
                    current_field_name = '';
                    saved_percent_symbols_count = 0;
                }

                continue;
            }

            if (saved_percent_symbols_count === 1)
            {
                current_field_name += template[i];
                continue;
            }

            result += template[i];
        }

        return result;
    }
}


let user =
    {
        id		: 20,
        name	: 'John Dow',
        role	: 'QA',
        salary	: 100
    };

let api_path_templates =
    [
        "/api/items/%id%/%name%",
        "/api/items/%id%/%role%",
        "/api/items/%id%/%salary%"
    ];

let api = new Api();

let api_paths = api_path_templates.map((api_path_template) =>
{
    return api.get_api_path(user, api_path_template);
});
let api_paths2 = api_path_templates.map((api_path_template) =>
{
    return api.get_api_path2(user, api_path_template);
});

console.log(JSON.stringify(api_paths));
console.log(JSON.stringify(api_paths2));

// Ожидаемый результат
let expected_result = ["/api/items/20/John%20Dow","/api/items/20/QA","/api/items/20/100"];
