/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ValidationContext } from '../index';
import { GraphQLError } from '../../error';
import {
  FRAGMENT_DEFINITION,
  OPERATION_DEFINITION,
} from '../../language/kinds';

export function nonExecutableDefinitionMessage(defName: string): string {
  return (
    `The "${defName}" definition is not executable.`
  );
}

/**
 * Executable definitions
 *
 * A GraphQL document is only valid for execution if all definitions are either
 * operation or fragment definitions.
 */
export function ExecutableDefinitions(context: ValidationContext): any {
  return {
    Document(node) {
      node.definitions.forEach(definition => {
        if (
          definition.kind !== OPERATION_DEFINITION &&
          definition.kind !== FRAGMENT_DEFINITION
        ) {
          context.reportError(new GraphQLError(
            nonExecutableDefinitionMessage(
              definition.name.value,
            ),
            [ definition.name ]
          ));
        }
      });
      return false;
    }
  };
}
