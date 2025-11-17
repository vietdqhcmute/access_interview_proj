Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins %r{https://.*\.vercel\.app},
            'https://access-interview-proj.vercel.app',
            'localhost:5173',
            '127.0.0.1:5173',
            /http:\/\/localhost(:\d+)?/

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true,
      expose: ['Authorization']
  end
end
