export default function plop(/** @type {import("plop").NodePlopAPI} */ plop) {
  plop.setGenerator("ui", {
    description: "Create a new UI component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./src/ui/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "./config/plop-templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "./src/ui/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "./config/plop-templates/Story.tsx.hbs",
      },
      {
        type: "add",
        path: "./src/ui/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "./config/plop-templates/Test.tsx.hbs",
      },
      {
        type: "append",
        path: "./src/ui/index.ts",
        template:
          'export { default as {{pascalCase name}} } from "./{{pascalCase name}}/{{pascalCase name}}";',
      },
    ],
  });

  plop.setGenerator("hook", {
    description: "Create a new hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Hook name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "./src/hooks/{{camelCase name}}/{{camelCase name}}.ts",
        template: "export default function {{camelCase name}}() {}",
      },
      {
        type: "add",
        path: "./src/hooks/{{camelCase name}}/{{camelCase name}}.test.tsx",
        templateFile: "./config/plop-templates/Hook.test.tsx.hbs",
      },
      {
        type: "append",
        path: "./src/hooks/index.ts",
        template:
          'export { default as {{camelCase name}} } from "./{{camelCase name}}/{{camelCase name}}";\n',
      },
    ],
  });
}
