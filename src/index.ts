import { rule as matchingReturnType } from './matching-return-type.rule'
import { rule as matchingResolveFieldParentType } from './matching-resolve-field-parent-type.rule'
import { rule as argsNullableOptional } from './args-nullable-optional.rule'

module.exports = {
  rules: {
    'matching-return-type': matchingReturnType,
    'matching-resolve-field-parent-type': matchingResolveFieldParentType,
    'args-nullable-optional': argsNullableOptional,
  },
}
