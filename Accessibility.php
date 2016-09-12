<?php

if ( function_exists( 'wfLoadExtension' ) ) {
	wfLoadExtension( 'Accessibility' );
	
	// Keep i18n globals so mergeMessageFileList.php doesn't break
	$wgMessagesDirs['Accessibility'] = __DIR__ . '/i18n';
	
	$wgExtensionMessagesFiles['AccessibilityMagic'] = __DIR__ . '/Accessibility.i18n.magic.php';
	wfWarn(
		'Deprecated PHP entry point used for Accessibility extension. Please use wfLoadExtension ' .
		'instead, see https://www.mediawiki.org/wiki/Extension_registration for more details.'
	);
	return true;
} else {
	die( 'This version of the Accessibility extension requires MediaWiki 1.25+' );
}
