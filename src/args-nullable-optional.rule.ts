import { ESLintUtils } from '@typescript-eslint/utils'
import { TSESTree } from '@typescript-eslint/types/dist'
import { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint'

const createRule = ESLintUtils.RuleCreator((name) => name)

export const rule = createRule({
  name: 'args-nullable-optional',
  defaultOptions: [],
  meta: {
    messages: {
      argsNullableNotOptional: 'Parameter with @Args({ nullable: true }) must be marked as optional with ?',
      argsOptionalNotNullable: 'Optional parameter with @Args should have nullable: true',
    },
    schema: [],
    docs: {
      description: 'Ensure @Args nullable property matches parameter optionality',
    },
    type: 'problem',
  },
  create: (context) => {
    return {
      'MethodDefinition[decorators.length>=1]:exit': (
        node: TSESTree.MethodDefinition,
      ) => processNode(node, context),
    }
  },
})

const processNode = (
  node: TSESTree.MethodDefinition,
  context: Readonly<
    RuleContext<'argsNullableNotOptional' | 'argsOptionalNotNullable', never[]>
  >,
) => {
  if (node.value.type !== 'FunctionExpression') {
    return
  }

  // Check each parameter for @Args decorator
  node.value.params.forEach((param) => {
    if (!param.decorators || param.decorators.length === 0) {
      return
    }

    // Find @Args decorator
    const argsDecorator = param.decorators.find((decorator) => {
      if (decorator.expression.type !== 'CallExpression') {
        return false
      }
      const { callee } = decorator.expression
      if (callee.type !== 'Identifier') {
        return false
      }
      return callee.name === 'Args'
    })

    if (!argsDecorator) {
      return
    }

    // Check if parameter is optional
    const isParameterOptional = param.type === 'Identifier' && param.optional === true

    // Parse @Args decorator arguments to check for nullable property
    const argsExpression = argsDecorator.expression as TSESTree.CallExpression
    let isNullable = false

    // Check if there's a second argument (options object)
    if (argsExpression.arguments.length > 1) {
      const optionsArg = argsExpression.arguments[1]

      if (optionsArg.type === 'ObjectExpression') {
        const nullableProperty = optionsArg.properties.find((prop) => {
          if (prop.type !== 'Property' || prop.key.type !== 'Identifier') {
            return false
          }
          return prop.key.name === 'nullable'
        })

        if (nullableProperty && nullableProperty.type === 'Property') {
          // Check if nullable is set to true
          if (nullableProperty.value.type === 'Literal' && nullableProperty.value.value === true) {
            isNullable = true
          }
        }
      }
    }

    // Validate the relationship between nullable and optional
    if (isNullable && !isParameterOptional) {
      context.report({
        node: param,
        messageId: 'argsNullableNotOptional',
      })
    } else if (isParameterOptional && !isNullable) {
      context.report({
        node: param,
        messageId: 'argsOptionalNotNullable',
      })
    }
  })
}
