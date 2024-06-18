export const TailWindBlogComponents = [
  {
    id: 'blog-hero',
    label: 'Hero Section',
    html: () =>
      `<section class="w-full bg-gradient-to-br from-purple-500 to-pink-500 py-20 text-center">
        <h1 class="text-6xl font-extrabold text-white mb-4">{'{ title }'}</h1>
        <p class="text-2xl text-white opacity-90">{'{ excerpt }'}</p>
      </section>`,
  },
  {
    id: 'iframe',
    label: 'IFrame',
    html: () =>
      `<div>
    <iframe src="" allowfullscreen></iframe></div>`,
  },
  {
    id: 'blog-post-card',
    label: 'Post Card',
    html: () =>
      `<div class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <img src="{{ thumbnail.asset.url }}" alt="{{ title }}" class="w-full h-64 object-cover transition-transform transform hover:scale-105 duration-500"/>
        <div class="pt-4">
          <h2 class="text-3xl font-semibold text-gray-900 mb-2">{'{ title }'}</h2>
          <p class="text-gray-700 mb-4">{'{ excerpt }'}</p>
          <a href="/post/{{ slug.current }}" class="text-indigo-600 hover:underline">Read more</a>
        </div>
      </div>`,
  },
  {
    id: 'blog-content',
    label: 'Content Section',
    html: () =>
      `<article class="prose lg:prose-xl max-w-none py-8 mx-auto">
        <div class="container mx-auto px-4">
          {'{ content }'}
        </div>
      </article>`,
  },
  {
    id: 'call-to-action',
    label: 'Call to Action',
    html: () =>
      `<div class="bg-indigo-600 text-white py-8 px-12 text-center rounded-lg shadow-lg">
        <h2 class="text-4xl font-bold mb-4">Subscribe to our newsletter</h2>
        <p class="text-xl mb-6">Get the latest updates and exclusive content delivered straight to your inbox.</p>
        <div class="flex justify-center">
          <input type="email" placeholder="Your email address" class="py-3 px-4 rounded-l-md border-r-0 focus:outline-none"/>
          <button class="bg-indigo-700 hover:bg-indigo-800 py-3 px-6 rounded-r-md focus:outline-none">Subscribe</button>
        </div>
      </div>`,
  },
  {
    id: 'blog-footer',
    label: 'Footer',
    html: () =>
      `<footer class="bg-gray-900 py-8 text-center text-white">
        <p>© 2023 Your Blog Name. All rights reserved.</p>
      </footer>`,
  },
  {
    id: 'author-bio',
    label: 'Author Bio',
    html: () =>
      `<div class="flex items-center mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <img src="{{ authorImage.asset.url }}" alt="Author Image" class="w-16 h-16 rounded-full mr-4"/>
        <div>
          <h3 class="text-lg font-medium text-gray-900">{'{ authorName }'}</h3>
          <p class="text-gray-600">{'{ authorBio }'}</p>
        </div>
      </div>`,
  },
  {
    id: 'related-posts',
    label: 'Related Posts',
    html: () =>
      `<section class="mt-12">
        <h2 class="text-3xl font-semibold text-gray-900 mb-6">Related Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      </section>`,
  },
  {
    id: 'animated-dropdown-nav',
    label: 'Animated Dropdown Nav',

    html: () => `<header class="w-full bg-white shadow-md">
        <div class="container mx-auto px-6 py-3">
          <div class="flex justify-between items-center">
            <div class="text-2xl font-bold">Brand</div>
            <div class="hidden md:block">
              <nav class="flex space-x-4">
                <a href="#" class="text-gray-800 hover:text-indigo-600">Home</a>
                <a href="#" class="text-gray-800 hover:text-indigo-600">About</a>
                <div class="relative group">
                  <button class="text-gray-800 hover:text-indigo-600 flex items-center">
                    Services
                    <svg class="ml-1 w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 14.71l-7.39-7.39a1 1 0 00-1.42 1.42l8 8a1 1 0 001.42 0l8-8a1 1 0 00-1.42-1.42z"/></svg>
                  </button>
                  <div class="absolute left-0 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                    <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Service 1</a>
                    <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Service 2</a>
                    <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Service 3</a>
                  </div>
                </div>
                <a href="#" class="text-gray-800 hover:text-indigo-600">Contact</a>
              </nav>
            </div>
            <div class="md:hidden">
              <button class="text-gray-800 focus:outline-none focus:text-indigo-600">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18m-9 6h9"/></svg>
              </button>
            </div>
          </div>
          <div class="md:hidden">
            <nav class="flex flex-col mt-4 space-y-2">
              <a href="#" class="text-gray-800 hover:text-indigo-600">Home</a>
              <a href="#" class="text-gray-800 hover:text-indigo-600">About</a>
              <div class="relative">
                <button class="text-gray-800 hover:text-indigo-600 flex items-center">
                  Services
                  <svg class="ml-1 w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 14.71l-7.39-7.39a1 1 0 00-1.42 1.42l8 8a1 1 0 001.42 0l8-8a1 1 0 00-1.42-1.42z"/></svg>
                </button>
                <div class="absolute left-0 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                  <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Service 1</a>
                  <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Service 2</a>
                  <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Service 3</a>
                </div>
              </div>
              <a href="#" class="text-gray-800 hover:text-indigo-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>`,
  },
  {
    id: 'feature-section',
    label: 'Feature Section',
    html: () =>
      `<section class="bg-white py-12">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-semibold text-gray-800">Features</h2>
          <div class="flex flex-wrap mt-8">
            <div class="w-full md:w-1/3 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Feature One</h3>
                <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Feature Two</h3>
                <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Feature Three</h3>
                <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
              </div>
            </div>
          </div>
        </div>
      </section>`,
  },
  {
    id: 'testimonial-section',
    label: 'Testimonial Section',
    html: () =>
      `<section class="bg-gray-100 py-12">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-semibold text-gray-800">Testimonials</h2>
          <div class="flex flex-wrap mt-8">
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <p class="text-gray-600 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris."</p>
                <div class="flex items-center justify-center">
                  <img src="https://via.placeholder.com/50" alt="Person" class="w-12 h-12 rounded-full"/>
                  <div class="ml-4">
                    <h4 class="text-xl font-semibold text-gray-800">John Doe</h4>
                    <p class="text-gray-600">CEO, Company</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <p class="text-gray-600 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris."</p>
                <div class="flex items-center justify-center">
                  <img src="https://via.placeholder.com/50" alt="Person" class="w-12 h-12 rounded-full"/>
                  <div class="ml-4">
                    <h4 class="text-xl font-semibold text-gray-800">Jane Smith</h4>
                    <p class="text-gray-600">Marketing Manager, Company</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/3 px-4 py-4">
              <div class="bg-white p-6 rounded-lg shadow-lg">
                <p class="text-gray-600 mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris."</p>
                <div class="flex items-center justify-center">
                  <img src="https://via.placeholder.com/50" alt="Person" class="w-12 h-12 rounded-full"/>
                  <div class="ml-4">
                    <h4 class="text-xl font-semibold text-gray-800">Michael Brown</h4>
                    <p class="text-gray-600">CTO, Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`,
  },
  {
    id: 'pricing-plans',
    label: 'Pricing Plans',
    html: () =>
      `<section class="bg-white py-12">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-semibold text-gray-800">Pricing Plans</h2>
          <div class="flex flex-wrap mt-8 justify-center">
            <div class="w-full md:w-1/2 lg:w-1/4 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Basic</h3>
                <p class="text-gray-600 mb-4">$19/month</p>
                <ul class="text-gray-600 mb-6">
                  <li>Feature One</li>
                  <li>Feature Two</li>
                  <li>Feature Three</li>
                </ul>
                <button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Sign Up</button>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Standard</h3>
                <p class="text-gray-600 mb-4">$49/month</p>
                <ul class="text-gray-600 mb-6">
                  <li>Feature One</li>
                  <li>Feature Two</li>
                  <li>Feature Three</li>
                  <li>Feature Four</li>
                </ul>
                <button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Sign Up</button>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Premium</h3>
                <p class="text-gray-600 mb-4">$99/month</p>
                <ul class="text-gray-600 mb-6">
                  <li>Feature One</li>
                  <li>Feature Two</li>
                  <li>Feature Three</li>
                  <li>Feature Four</li>
                  <li>Feature Five</li>
                </ul>
                <button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </section>`,
  },
  {
    id: 'faq-section',
    label: 'FAQ Section',
    html: () =>
      `<section class="bg-gray-100 py-12">
        <div class="container mx-auto px-6">
          <h2 class="text-4xl font-semibold text-gray-800 text-center">Frequently Asked Questions</h2>
          <div class="mt-8">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
              <h3 class="bg-gray-200 px-4 py-2 text-xl font-semibold text-gray-800 cursor-pointer">What is your refund policy?</h3>
              <div class="px-4 py-2 text-gray-600">
                <p>We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service, you can request a refund within 30 days of your purchase.</p>
              </div>
            </div>
            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
              <h3 class="bg-gray-200 px-4 py-2 text-xl font-semibold text-gray-800 cursor-pointer">How do I contact support?</h3>
              <div class="px-4 py-2 text-gray-600">
                <p>You can contact our support team via email at support@example.com or through our live chat on the website. We're available 24/7 to assist you.</p>
              </div>
            </div>
            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
              <h3 class="bg-gray-200 px-4 py-2 text-xl font-semibold text-gray-800 cursor-pointer">Can I change my plan later?</h3>
              <div class="px-4 py-2 text-gray-600">
                <p>Yes, you can upgrade or downgrade your plan at any time from your account settings. The new plan will take effect immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </section>`,
  },
  {
    id: 'team-section',
    label: 'Team Section',
    html: () =>
      `<section class="bg-white py-12">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-semibold text-gray-800">Meet Our Team</h2>
          <div class="flex flex-wrap mt-8 justify-center">
            <div class="w-full md:w-1/2 lg:w-1/4 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <img src="https://via.placeholder.com/150" alt="Team Member" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">John Doe</h3>
                <p class="text-gray-600">CEO</p>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <img src="https://via.placeholder.com/150" alt="Team Member" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Jane Smith</h3>
                <p class="text-gray-600">Marketing Manager</p>
              </div>
            </div>
            <div class="w-full md:w-1/2 lg:w-1/4 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <img src="https://via.placeholder.com/150" alt="Team Member" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Michael Brown</h3>
                <p class="text-gray-600">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </section>`,
  },
  {
    id: 'blog-hero',
    label: 'Hero Section',
    html: () =>
      `<section class="w-full bg-gradient-to-br from-purple-500 to-pink-500 py-20 text-center">
        <h1 class="text-6xl font-extrabold text-white mb-4">{'{ title }'}</h1>
        <p class="text-2xl text-white opacity-90">{'{ excerpt }'}</p>
      </section>`,
  },
  {
    id: 'blog-post-card',
    label: 'Post Card',
    html: () =>
      `<div class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <img src="{{ thumbnail.asset.url }}" alt="{{ title }}" class="w-full h-64 object-cover transition-transform transform hover:scale-105 duration-500"/>
        <div class="pt-4">
          <h2 class="text-3xl font-semibold text-gray-900 mb-2">{'{ title }'}</h2>
          <p class="text-gray-700 mb-4">{'{ excerpt }'}</p>
          <a href="/post/{{ slug.current }}" class="text-indigo-600 hover:underline">Read more</a>
        </div>
      </div>`,
  },
  // Add the rest of the existing components here...

  {
    id: 'button',
    label: 'Button',
    html: () =>
      `<button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">{'{ buttonText }'}</button>`,
  },
  {
    id: 'link',
    label: 'Link',
    html: () =>
      `<a href="{'{ href }'}" class="text-indigo-600 hover:underline">{'{ linkText }'}</a>`,
  },
  {
    id: 'product-card',
    label: 'Product Card',
    html: () =>
      `<div class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <img src="{{ productImage.asset.url }}" alt="{{ productName }}" class="w-full h-64 object-cover transition-transform transform hover:scale-105 duration-500"/>
        <div class="pt-4">
          <h2 class="text-3xl font-semibold text-gray-900 mb-2">{'{ productName }'}</h2>
          <p class="text-gray-700 mb-4">{'{ productDescription }'}</p>
          <p class="text-gray-900 font-bold">{'{ productPrice }'}</p>
          <button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 mt-4">Buy</button>
        </div>
      </div>`,
  },
  {
    id: 'product-list',
    label: 'Product List',
    html: () =>
      `<section class="bg-white py-12">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-4xl font-semibold text-gray-800">Our Products</h2>
          <div class="flex flex-wrap mt-8 justify-center">
            <!-- Repeat this product card as needed -->
            <div class="w-full md:w-1/2 lg:w-1/4 px-4 py-4">
              <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                <img src="{{ productImage.asset.url }}" alt="{{ productName }}" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">{'{ productName }'}</h3>
                <p class="text-gray-600">{'{ productDescription }'}</p>
                <p class="text-gray-900 font-bold">{'{ productPrice }'}</p>
                <button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 mt-4">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>`,
  },
  {
    id: 'cart-summary',
    label: 'Cart Summary',
    html: () =>
      `<div class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h2 class="text-3xl font-semibold text-gray-900 mb-4">Shopping Cart</h2>
        <ul class="mb-6">
          <!-- Repeat this list item for each product in the cart -->
          <li class="flex justify-between items-center py-2 border-b">
            <div class="flex items-center">
              <img src="{{ productImage.asset.url }}" alt="{{ productName }}" class="w-16 h-16 rounded-full mr-4"/>
              <div>
                <h3 class="text-xl font-semibold text-gray-900">{'{ productName }'}</h3>
                <p class="text-gray-600">{'{ productPrice }'}</p>
              </div>
            </div>
            <button class="text-red-600 hover:text-red-800">Remove</button>
          </li>
        </ul>
        <div class="text-right">
          <p class="text-xl font-semibold text-gray-900 mb-4">Total: {'{ cartTotal }'}</p>
          <button class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Proceed to Checkout</button>
        </div>
      </div>`,
  },
  {
    id: 'checkout-form',
    label: 'Checkout Form',
    html: () =>
      `<form class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-3xl font-semibold text-gray-900 mb-4">Checkout</h2>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="name">Name</label>
          <input type="text" id="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="email">Email</label>
          <input type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="address">Address</label>
          <input type="text" id="address" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="card">Credit Card</label>
          <input type="text" id="card" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>
        <button type="submit" class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Place Order</button>
      </form>`,
  },
]
