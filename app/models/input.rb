class Input < ActiveRecord::Base
    validates :piece, :presence => {message: "Please enter a piece."}, :on => :create
end
