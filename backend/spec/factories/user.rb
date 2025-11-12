FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }

    trait :with_specific_email do
      email { "test@example.com" }
    end
  end
end
