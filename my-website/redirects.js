import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
(function() {
  // List of specific URLs to handle
  const urlsToHandle = [
        '/docs-example/example#test',

  ];

  // Get the current path and hash
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  // If there is a hash fragment
  if (currentHash && currentHash.includes('#')) {
    // Create the full URL with hash replaced by '/'
    const newPath = currentPath + currentHash.replace('#', '/');

    // Loop through the list of URLs to handle
    for (const url of urlsToHandle) {
      // Check if the current path matches the URL to handle
      if (currentPath === url.split('#')[0] && window.location.hash === `#${url.split('#')[1]}`) {
        // Redirect to the new path
        window.location.replace(newPath);
        return; // Exit after the first match
      }
    }
  }
})();
}
