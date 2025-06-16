
async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    next: {
      revalidate: 600 
    }
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

export async function getProducts() {
  try {
    const data = await fetchAPI('/api/products?populate=*');

    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }


    return data.data.map(product => ({
      id: product.id,
      title: product.Name || '',
      description: product.Description || '',
      price: product.Price || 0,
      image: {
        url: product.Image?.url || null,
        formats: product.Image?.formats || null
      }
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const data = await fetchAPI(`/api/products/${id}?populate=*`);

    if (!data.data) {
      return null;
    }

    // Map only the fields we need (similar to Payload's select)
    return {
      id: data.data.id,
      title: data.data.Name || '',
      description: data.data.Description || '',
      price: data.data.Price || 0,
      image: {
        url: data.data.Image?.url || null,
        formats: data.data.Image?.formats || null
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
