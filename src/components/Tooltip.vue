<script setup>
defineProps({
  text: String
});
</script>

<template>
  <div class="tooltip-wrapper">
    <slot name="trigger"></slot>
    <div class="tooltip-container">
      <span class="tooltip-text">{{ text }}</span>
    </div>
  </div>
</template>

<style scoped>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.tooltip-container {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		bottom: calc(100% + 25px);
		left: 50%;
		transform: translateX(-50%);
		
		width: fit-content;
		padding: 10px;
		background-color: var(--md-sys-color-surface-container-highest);
		border-radius: 10px;
		
		transition: opacity 0.3s ease-in-out;
		pointer-events: none;
		z-index: 1000;
	}

	.tooltip-text {
		color: var(--md-sys-color-on-surface);
		white-space: nowrap;
	}

	.tooltip-wrapper:hover .tooltip-container {
		visibility: visible;
		opacity: 1;
	}
</style>