import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  (function() {
    // List of specific paths to redirect
    const redirects = {
      '/docs-example/tutorials/intro': '/docs-example/intro',
      '/docs-example/tutorial-basics#create-a-document': '/docs-example/tutorial-basics/create-a-document',
    };

    // Get the current path
    const currentPath = window.location.pathname;

    // Check if the current path matches any in the redirects list
    if (redirects[currentPath]) {
      // Redirect to the new path
      window.location.replace(redirects[currentPath]);
    }
  })();
}


