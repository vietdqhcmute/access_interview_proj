class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase
  end
end
