// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>, gitoak
//
// SPDX-License-Identifier: CC0-1.0

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow store.get/store.set outside of stores/ folder',
      category: 'Best Practices',
    },
  },
  create(context) {
    const filename = context.filename;
    const isInStoresFolder = filename.includes('/stores/') || filename.includes('\\stores\\');

    if (isInStoresFolder) {
      return {};
    }

    return {
      CallExpression(node) {
        // Check for store.get() or store.set()
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.name === 'store' &&
          (node.callee.property.name === 'get' || node.callee.property.name === 'set')
        ) {
          context.report({
            node,
            message: `Consider using store.${node.callee.property.name}() within a Pinia store to prevent state mismatches.`,
          });
        }
      },
    };
  },
};
