<?php
/**
 * Hooks for Accessibility extension
 *
 * @file
 * @ingroup Extensions
 */

class AccessibilityHooks {
	public static function onBeforePageDisplay( OutputPage &$out, Skin &$skin) {

		$out->addModules( array( 'ext.accessibility' ) );
		return true;
	}
}
