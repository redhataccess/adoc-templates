'use strict';
/* global Prism */

/**
 * Sequesters docs content area into shadow root for style scoping
 * Updates some HTML for styling/behavior enhancements
 */
(function () {
  /**
   * Transforms additional resources
   * @param {Element} $additionalResource Element with ._additional-resources class, provided by authors
   */
   const processAdditionalResource = ($additionalResource) => {
    // Wrap additional resources in an aside instead of a div
    const $asideWrapper = document.createElement('aside');
    $asideWrapper.setAttribute(
      'class',
      $additionalResource.getAttribute('class')
    );

    $asideWrapper.innerHTML = $additionalResource.innerHTML;
    $additionalResource.parentElement.replaceChild(
      $asideWrapper,
      $additionalResource
    );
    $additionalResource = $asideWrapper;
  };

  /**
   * Adds optimal markup around codeblocks and runs syntax highlighting on it
   * @param {Element} $codeBlock An element that is a pre, or has a language-* class on it and is in a pre tag
   */
  const processCodeblock = ($codeBlock, $docsContent) => {
    // Quick exit if this has been processed already
    const $processedParentElements = $codeBlock.closest('pre.codeblock--processed, .codeblock__wrapper');
    if ($codeBlock.classList.contains('codeblock--processed') || $processedParentElements) {
      return;
    }
    // debugger;

    const codeBlockClasses = $codeBlock.getAttribute('class');
    const codeBlockClassesArray = codeBlockClasses
      ? codeBlockClasses.split(' ')
      : false;
    // Adding a hidden copy of the un-upgraded code content to the DOM, may be unecessary
    const $plainCodeBlock = document.createElement('pre');

    // Figure out code's language
    let language = 'none'; // Default to none

    // Iterate over class names and find code language
    const getLanguageClass = (classesArray) => {
      if (classesArray) {
        for (let index = 0; index < classesArray.length; index++) {
          const className = classesArray[index];
          if (className.substring(0, 9) === 'language-') {
            language = className.substring(9).toLowerCase();
            return className;
          }
        }
      }
    };

    // Keeps track of the provided language class, which may need to be removed
    let languageClass = getLanguageClass(codeBlockClassesArray);

    // Make sure we're dealing with a pre element, which could be the element or it's parent
    if ($codeBlock.tagName.toLowerCase() !== 'pre') {
      if (
        $codeBlock.parentElement &&
        $codeBlock.parentElement.tagName.toLowerCase() === 'pre'
      ) {
        $codeBlock = $codeBlock.parentElement;
      }
 else {
        // If the element or it's parent isn't a pre-tag don't format it
        return;
      }
    }

    const $codeBlockWrapper = $codeBlock.parentElement;

    // Create a copy without the syntax highlighting or HTML and annotations removed
    const plainCodeBlockId = `codeblock--plain--${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    // Remove any annotations from the code block for the copy button
    // Users don't want to copy artifacts from the docs, just the code
    const $codeBlockClone = $codeBlock.cloneNode(true);
    const $codeBlockAnnotations = $codeBlockClone.querySelectorAll('.colist-num');
    for (let index = 0; index < $codeBlockAnnotations.length; index++) {
      const $codeBlockAnnotation = $codeBlockAnnotations[index];
      // @todo IE
      $codeBlockAnnotation.remove();
    }

    // Use this cleaned up code for the copy content
    let contentToCopy = $codeBlockClone.innerText;

    // Remove prompt from copy value if we have one
    switch (language) {
      case 'none':
      case 'terminal':
      case 'shell':
        const contentToCopyTrimmed = contentToCopy.trim();
        let promptIndex = -1;
        if (contentToCopyTrimmed.indexOf('# ') === 0) {
          // Get non-trimmed index
          promptIndex = contentToCopy.indexOf('# ');
        }
 else if (contentToCopyTrimmed.indexOf('$ ') === 0) {
          // Get non-trimmed index
          promptIndex = contentToCopy.indexOf('$ ');
        }

        if (promptIndex > -1) {
          contentToCopy = contentToCopy.substring(promptIndex + 2);
          $codeBlockClone.innerText = contentToCopy;
        }
        break;
    }

    // Store the content that could be copied in an object on the shadowRoot owner
    if ($docsContent) {
      // Make sure data structures are instantiated
      $docsContent.rhData = $docsContent.rhData ? $docsContent.rhData : {};
      $docsContent.rhData.plainCodeBlockContent = $docsContent.rhData.plainCodeBlockContent
        ? $docsContent.rhData.plainCodeBlockContent : {};
      // Store the data we should copy in the object by the id of the $plainCodeBlock
      $docsContent.rhData.plainCodeBlockContent[plainCodeBlockId] = contentToCopy;
    }

    // Finish setting up the plainCodeblock
    $plainCodeBlock.hidden = true;
    $plainCodeBlock.id = plainCodeBlockId;
    $plainCodeBlock.classList.add('codeblock--plain');
    $plainCodeBlock.innerText = contentToCopy;

    if (
      $codeBlockWrapper
      && !$codeBlockWrapper.classList.contains('codeblock__wrapper')
      && !$codeBlockWrapper.querySelector('.codeblock__inner-wrapper')
    ) {
      const $codeBlockInnerWrapper = document.createElement('div');
      // Necessary becase of FF bug: https://codepen.io/wesruv/full/dyzxMzW
      $codeBlockInnerWrapper.classList.add('codeblock__inner-wrapper');
      $codeBlockWrapper.classList.add('codeblock__wrapper');
      $codeBlockWrapper.append($codeBlockInnerWrapper);
      $codeBlockInnerWrapper.append($codeBlock);
      $codeBlockWrapper.dataset.plainCodeBlockId = plainCodeBlockId;
      $codeBlock.classList.add('codeblock');

      // Append the hidden unformatted codeblock
      $codeBlockWrapper.appendChild($plainCodeBlock);

      // Create and add copy button
      const $copyButton = document.createElement('pfe-clipboard');
      const $copyText = document.createElement('span');
      const $copySuccessText = document.createElement('span');

      $copyText.setAttribute('slot', 'text');
      // @todo Translate
      $copyText.innerText = 'Copy';

      $copySuccessText.setAttribute('slot', 'text--success');
      // @todo Translate
      $copySuccessText.innerText = 'Copied!';

      $copyButton.setAttribute('copy-from', 'property');
      $copyButton.classList.add('codeblock__copy');

      $copyButton.appendChild($copyText);
      $copyButton.appendChild($copySuccessText);
      $codeBlockWrapper.appendChild($copyButton);

      /**
       * Sets the content to copy by figuring out which button responded and giving it the correct content
       */
      document.addEventListener('pfe-clipboard:connected', (event) => {
        const $thisComponent = event.detail.component;
        const $thisCodeWrapper = $thisComponent.closest('.codeblock__wrapper');

        // Verify that we can find the ID, and we can find the content to copy
        if (
          $thisComponent
          && $thisCodeWrapper
          && $thisCodeWrapper.dataset.plainCodeBlockId
          && $docsContent
          && $docsContent.rhData
          && $docsContent.rhData.plainCodeBlockContent
          && $docsContent.rhData.plainCodeBlockContent[$thisCodeWrapper.dataset.plainCodeBlockId]
        ) {
          // Set the content to be copied from our object of code data
          $thisComponent.contentToCopy =
            $docsContent.rhData.plainCodeBlockContent[
              $thisCodeWrapper.dataset.plainCodeBlockId
            ];
        }
        // If something went wrong, hide the copy button since it won't work.
        else {
          $thisComponent.hidden = true;
          console.warn('Couldn\'t find content to copy for the below copy button', $thisComponent);
        }
      });
    }

    // Alias languages as described by https://docs.google.com/spreadsheets/d/1T2_Hc3Pi4Phu2R4S9OBLv7kGx790FJfFkCMNSKLvMwI/edit#gid=0
    // This is covering for our enormous backlog of content
    switch (language) {
      case 'config':
        language = 'text';
        break;
      case 'dns':
        language = 'dns-zone';
        break;
      case 'terminal':
        language = 'shell';
        $codeBlock.classList.add('command-line');
        break;
      case 'golang':
        language = 'go';
        break;
      case 'make':
        language = 'makefile';
        break;
    }

    // Make sure correct class exists on wrapper element
    if (!$codeBlock.classList.contains(`language-${language}`)) {
      $codeBlock.classList.remove(languageClass);
      $codeBlock.classList.add(`language-${language}`);
    }

    $codeBlock.classList.add('codeblock--processed');

    // Highlight syntax
    // Putting in a setTimeout to throw this process in the backburner so we don't hold up the main thread
    setTimeout(
      () => {
        try {
          Prism.highlightElement($codeBlock, false);
        }
 catch (error) {
          console.error(error);
        }
      },
      0
    );
  };



  /**
   * Adds print button to secondary header area
   * @param {Element} $headerSecondaryWrapper UL list that has the updated and published dates
   */
  const addPrintButton = ($headerSecondaryWrapper) => {
    // Create wrapper
    const $printButtonWrapper = document.createElement('li');
    $printButtonWrapper.classList.add('rh-docs-details-item');
    $printButtonWrapper.classList.add('rhdocs-print-button');

    // Create print button
    const $printButton = document.createElement('button');
    // @todo Translate this
    $printButton.innerText = 'Print';
    $printButton.classList.add('rhdocs__print-button');

    $printButton.addEventListener('click', () => {
      window.print();
    });

    $printButtonWrapper.append($printButton);
    $headerSecondaryWrapper.append($printButtonWrapper);
  };

  /**
   * Transforms content to our ideal state before putting it back into the DOM
   * @param {Element} $content Docs content that we want to adjust before putting back
   * @returns Element
   */
  const transformDocsHtml = ($content, $docsContent) => {
    // Process additional resources
    const $additionalResourcesWrappers = $content.querySelectorAll('._additional-resources');
    for (let index = 0; index < $additionalResourcesWrappers.length; index++) {
      let $additionalResource = $additionalResourcesWrappers[index];
      processAdditionalResource($additionalResource);
    }

    // Process codeblocks with languages
    // Doing this first since there are some cases where the language class isn't on the pre
    const $codeBlocks = $content.querySelectorAll(
      'pre[class*=\'language-\'], code[class*=\'language-\']'
    );
    for (let index = 0; index < $codeBlocks.length; index++) {
      const $codeBlock = $codeBlocks[index];
      processCodeblock($codeBlock, $docsContent);
    }

    // Process the other codeblocks
    // processCodeblocks will quick exit for pre's that have been processed because a child element had the language
    const $allCodeBlocks = $content.querySelectorAll('pre');
    if ($allCodeBlocks) {
      for (let index = 0; index < $allCodeBlocks.length; index++) {
        let $codeBlock = $allCodeBlocks[index];
        processCodeblock($codeBlock, $docsContent);
      }
    }

    // Wrap all tables with rh-table
    const $tables = $content.querySelectorAll('table');
    for (let index = 0; index < $tables.length; index++) {
      const $table = $tables[index];

      if (!$table.parentElement.classList.contains('table-wrapper')) {
        // @todo RH Table needs to be added to portal for it to do it's fanciness
        const $tableWrapper = document.createElement('rh-table');
        $tableWrapper.classList.add('table-wrapper');
        $table.parentElement.replaceChild($tableWrapper, $table);
        $tableWrapper.append($table);
      }
    }

    return $content;
  };

  /**
   * Puts docs content into a shadowroot to avoid style contamination
   * Due to our massive amount of CSS technical debt
   *
   * @param {Element} $docsContent The content wrapper for documentation
   * @param {String} styleSheetUrl URL to rhdocs.css to add to the shadow DOM
   */
  const processDocsContent = ($docsContent, styleSheetUrl) => {
    // Quick exit if we're on a crap browser or this already has a shadowRoot
    if (typeof $docsContent.attachShadow !== 'function' || $docsContent.shadowRoot) {
      return;
    }

    // Set the content height while we mess with it
    if ($docsContent.offsetHeight) {
      $docsContent.style.height = `${$docsContent.offsetHeight}px`;
    }

    // Create and populate shadow DOM
    $docsContent.attachShadow({'mode': 'open',});
    let $shadowWrapper = document.createElement('div');
    $shadowWrapper.id = 'wrapper';
    $shadowWrapper.classList.add('rhdocs', 'rhdocs__content');

    // Add a class if there's a superdoc sidebar
    if (document.querySelector('.j-superdoc__nav')) {
      $shadowWrapper.classList.add('rhdocs__content--has-superdoc-nav');
    }

    // Add our styles to the shadow DOM
    const linkTag = document.createElement('link');
    linkTag.setAttribute('id', 'rhdocs');
    linkTag.setAttribute('href', styleSheetUrl);
    linkTag.setAttribute('rel', 'stylesheet');
    $docsContent.shadowRoot.prepend(linkTag);

    for (let index = 0; index < $docsContent.childNodes.length; index++) {
      const $childNode = $docsContent.childNodes[index];
      let processNode = true;

      // Avoid unnecessary whitespace from the DOM
      if ($childNode.nodeType === Node.TEXT_NODE && $childNode.wholeText.trim().length === 0) {
        processNode = false;
      }

      if (processNode) {
        $shadowWrapper.append($childNode);
      }
    }

    // Transform the HTML while it's in memory to avoid repaint/layout shift
    $shadowWrapper = transformDocsHtml($shadowWrapper, $docsContent);
    // Put the content back into the DOM
    $docsContent.shadowRoot.append($shadowWrapper);
    $docsContent.removeAttribute('style');
  };

  // Kick off processing
  window.addEventListener('DOMContentLoaded', () => {

    // See if we can find the loaded stylesheet for rhdocs[.min].css
    // Otherwise fallback to a root relative link that should work
    let rhdocsUrl =
    '/webassets/avalon/j/public_modules/node_modules/@cpelements/cp-documentation/dist/rhdocs.min.css';
    for (let index = 0; index < document.styleSheets.length; index++) {
      const styleSheet = document.styleSheets[index];
      if (styleSheet.href && styleSheet.href.includes('/rhdocs.')) {
        // Get the exact same href so we get the cached file instead of hitting the network
        rhdocsUrl = styleSheet.ownerNode.getAttribute('href');
        break;
      }
    }

    // Process docs content
    const $docsContentElements = document.querySelectorAll('.rhdocs-content');
    for (let index = 0; index < $docsContentElements.length; index++) {
      const $docsContent = $docsContentElements[index];
      processDocsContent($docsContent, rhdocsUrl);
    }

    // Add print button to header
    const $headerSecondaryWrapper = document.querySelector('.rhdocs__header__secondary-wrapper');
    if ($headerSecondaryWrapper) {
      addPrintButton($headerSecondaryWrapper);
    }
  });
})();