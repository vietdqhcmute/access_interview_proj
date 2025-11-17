FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 8) }

    trait :with_specific_email do
      email { "test@example.com" }
    end
  end
end
