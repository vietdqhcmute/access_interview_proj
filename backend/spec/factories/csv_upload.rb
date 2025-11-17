FactoryBot.define do
  factory :csv_upload do
    association :user
    filename { "#{Faker::Lorem.word}.csv" }
    total_keyword { Faker::Number.between(from: 1, to: 100) }
    processed_keywords { Faker::Number.between(from: 0, to: total_keyword) }
    status { :processing }

    trait :processing do
      status { :processing }
      processed_keywords { Faker::Number.between(from: 0, to: total_keyword - 1) }
    end

    trait :successful do
      status { :successful }
      processed_keywords { total_keyword }
    end

    trait :failed do
      status { :failed }
    end
  end
end
