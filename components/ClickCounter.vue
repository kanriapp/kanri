<!-- SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech> -->
<!-- -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<!-- eslint-disable vue/require-explicit-emits -->
<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'a'
        },
        delay: {
            type: Number,
            default: 250
        }
    },
    data() {
        return {
            clickCount: 0,
            clickTimer: null
        };
    },
    methods: {
        handleClick(e) {
            e.preventDefault()

            this.clickCount++

            if (this.clickCount === 1) {
                this.clickTimer = setTimeout(() => {
                    this.clickCount = 0
                    this.$emit('single-click')
                }, this.delay)
            } else if (this.clickCount === 2) {
                clearTimeout(this.clickTimer)
                this.clickCount = 0
                this.$emit('double-click')
            }
        }
    }
};
</script>

<template>
  <div @click="e => handleClick(e)">
    <slot />
  </div>
</template>
