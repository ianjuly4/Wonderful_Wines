"""empty message

Revision ID: 14f9989fd5c2
Revises: 41b2ebb2c955
Create Date: 2024-12-30 13:17:36.678942

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '14f9989fd5c2'
down_revision = '41b2ebb2c955'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('wines', schema=None) as batch_op:
        batch_op.add_column(sa.Column('viewed_at', sa.DateTime(), nullable=True))
        batch_op.drop_column('created_at')
        batch_op.drop_column('updated_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('wines', schema=None) as batch_op:
        batch_op.add_column(sa.Column('updated_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('created_at', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True))
        batch_op.drop_column('viewed_at')

    # ### end Alembic commands ###
