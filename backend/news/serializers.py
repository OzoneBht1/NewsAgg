from rest_framework import serializers
from .models import News, Comment


class CommentSerializer(serializers.ModelSerializer):
    # user = serializers.SerializerMethodField()

    # def get_user(self, obj):
    #     return obj.user.name

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)


class NewsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = News
        fields = '__all__'
