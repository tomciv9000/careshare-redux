class User < ApplicationRecord
    has_secure_password
    extend Devise::Models #added this line to extend devise model
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,:recoverable, :rememberable, :trackable, :validatable
    include DeviseTokenAuth::Concerns::User
end